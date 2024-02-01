import { defaultTheme } from '@vuepress/theme-default'

import navbarConfig from './navbars';
import sidebarConfig from './sidebars';

const themeConfig = defaultTheme(
    {
        logo: '/images/MGC-logo.png',
        logoDark: '/images/MGC-darklogo.png',
        notFound: ["看起来你不小心踏入了虚空。"],
        backToHome: "←重生",
        repo: 'HyperCol/MGCD',

        navbar: navbarConfig,

        sidebar: sidebarConfig,
    }
);


export default themeConfig;