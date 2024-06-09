import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { createContext, useEffect, useState, useContext, useMemo } from 'react'

import { LoadingAnimation } from '~/components/Base/Loading'
import { useToast } from '~/hooks/useToast'
import {
  createUserOperation,
  existsUserOperation,
} from '~/infrastructure/operations/UserRepository'
// import { useAuth } from '~/hooks/useAuth'
import { auth, serverTimestamp } from '~/lib/firebase'
import { errorMessage } from '~/utils/errorMessage'

// ログインしていなくても開けるページ
const nonAuthPaths = ['/login', '/signup']

// 認証済みの人だけが開けるページかどうか
const isAuthPath = (path: string) => {
  // トップ画面だけは個別でチェック
  return (
    path !== '/' &&
    !nonAuthPaths.some((nonAuthPath) => path.startsWith(nonAuthPath))
  )
}

const FirebaseAuthContext = createContext<{
  uid: string | null
  currentUser: User | null | undefined
  isLogin: boolean
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}>({
  uid: null,
  currentUser: undefined,
  isLogin: false,
  loginWithGoogle: async () => {},
  logout: async () => {},
})

const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const { pathname, push } = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(null)
  const [uid, setUid] = useState<string | null>(null)
  const { showErrorToast } = useToast()

  const isLogin = useMemo(() => !!currentUser, [currentUser])

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider)
      .then(async (val) => {
        const userData = val.user
        const uid = userData.uid

        const isRegistered = await existsUserOperation(uid)
        if (!isRegistered) {
          await createUserOperation(uid, {
            backgroundImagePath: null,
            createdAt: serverTimestamp,
            displayName: '',
            email: userData.email!,
            profileImagePath: null,
            updatedAt: serverTimestamp,
            username: getInitialUsername(userData),
          })
        }

        push('/mypage')
      })
      .catch((e) => {
        showErrorToast('ログインに失敗しました', errorMessage(e))
      })
  }

  const logout = async () => {
    await signOut(auth)
    setCurrentUser(null)
    setUid(null)
    push('/')
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        setUid(user.uid)
      }

      // 認証していなくても開けるページならなにもしない
      if (!isAuthPath(pathname)) {
        return
      }

      // 未認証なら / に飛ばす
      if (!user) {
        setCurrentUser(null)
        setUid(null)
        push('/')
        return
      }
      return () => unsubscribe()
    })
  }, [pathname, push])

  if (isAuthPath(pathname) && !currentUser) {
    // currentUserのチェックが終わるまでは何も表示しない
    return <LoadingAnimation />
  }

  return (
    <FirebaseAuthContext.Provider
      value={{ uid, currentUser, isLogin, loginWithGoogle, logout }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export { FirebaseAuthContext, FirebaseAuthProvider }

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext)

export const getInitialUsername = (userData: User) => {
  if (userData.displayName) {
    return userData.displayName
  }
  if (userData.email) {
    return userData.email.split('@')[0]
  }
  return userData.uid
}
