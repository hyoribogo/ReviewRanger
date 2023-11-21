import { useLocation } from 'react-router-dom'
import { useUser, useLogout } from '@/apis/hooks'
import {
  LogoRowIcon,
  LogoShortIcon,
  ArrowLeftIcon,
  BasicProfileIcon,
} from '@/assets/icons'
import { rangerHead } from '@/assets/images'

const Header = () => {
  const { data } = useUser()
  const { mutate } = useLogout()

  const path = useLocation().pathname
  const avatarVisible = path !== '/sign-up' && path !== '/login'
  const goBackVisible = path !== '/login' && path !== '/'

  return (
    <div className="sticky top-0 z-10 flex h-12 w-screen shrink-0 justify-center bg-main-red-300 py-4 md:h-20">
      <div className="flex w-full items-center justify-between px-6">
        <div>
          <ArrowLeftIcon
            className={`md:hidden" ${!goBackVisible && 'hidden'}`}
          />
        </div>
        <div className="fixed left-1/2 flex -translate-x-1/2 transform items-center gap-1">
          <img
            src={rangerHead}
            alt="ranger-header"
            className="h-8 w-8 md:h-11 md:w-10"
          />
          <LogoShortIcon className="h-7 w-8 md:hidden" />
          <LogoRowIcon className="hidden h-11 w-60 md:block" />
        </div>
        <div>
          {avatarVisible && data && (
            <div className="dropdown z-40">
              <div
                className={`avatar avatar-sm flex items-center justify-center overflow-hidden border border-gray-200 bg-white md:avatar-md dark:bg-black `}
              >
                <BasicProfileIcon className="h-7 w-7 md:h-9 md:w-9" />
              </div>
              <div className="dropdown-menu dropdown-menu-left">
                <a className="dropdown-item text-sm">Profile</a>
                <a tabIndex={0} className="dropdown-item text-sm">
                  설문만들기
                </a>
                <a
                  tabIndex={1}
                  className="dropdown-item text-sm"
                  onClick={() => mutate()}
                >
                  로그아웃
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
