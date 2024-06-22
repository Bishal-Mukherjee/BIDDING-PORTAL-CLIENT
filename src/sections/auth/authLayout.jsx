import { useState } from 'react';

import { SignInView } from 'src/sections/auth/signIn';
import { SignUpView } from 'src/sections/auth/signUp';

export function AuthLayout() {
  const [navigationTab, setNavigationTab] = useState(0);

  const navigation = {
    0: <SignInView navigationTab={navigationTab} setNavigationTab={setNavigationTab} />,
    1: <SignUpView navigationTab={navigationTab} setNavigationTab={setNavigationTab} />,
  };

  return <>{navigation[navigationTab]}</>;
}
