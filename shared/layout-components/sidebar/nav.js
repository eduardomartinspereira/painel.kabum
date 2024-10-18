export const MENUITEMS = [
    {
        menutitle: 'GERAL',
    },
    {
        title: 'dashboard',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/components/dashboard',
        // children: [
        // 	{
        // 		path: "/components/dashboard/dashboard",
        // 		type: "link",
        // 		active: false,
        // 		selected: false,
        // 		title: "Dashboard-1",
        // 	},
        // 	{
        // 		path: "/components/dashboard/dashboard2",
        // 		type: "link",
        // 		active: false,
        // 		selected: false,
        // 		title: "Dashboard-2",
        // 	},
        // 	{
        // 		path: "/components/dashboard/dashboard3",
        // 		type: "link",
        // 		active: false,
        // 		selected: false,
        // 		title: "Dashboard-3",
        // 	},
        // ],
    },

    {
        menutitle: 'RELATÓRIOS',
    },
    {
        title: 'Financeiro',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H4c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9c0-1.103-.897-2-2-2zM4 11h4v8H4v-8zm6-1V4h4v15h-4v-9zm10 9h-4V9h4v10z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/components/icons/icons',
        // children: [
        //     {
        //         path: '/components/apps/fullcalendar',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //         title: 'Full Calendar',
        //     },
        //     {
        //         path: '/components/apps/contacts',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //         title: 'Contacts',
        //     },
        //     {
        //         path: '/components/apps/gallery',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //         title: 'Gallery',
        //     },
        //     {
        //         path: '/components/apps/sweetalerts',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //         title: 'Sweet Alerts',
        //     },

        //     {
        //         path: '/components/apps/notifications',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //         title: 'Notifications',
        //     },
        //     {
        //         path: '/components/apps/widget-notification',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //         title: 'Widget-notification',
        //     },
        //     {
        //         path: '/components/apps/treeview',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //         title: 'Treeview',
        //     },
        //     {
        //         path: '/components/apps/file-manager',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //         title: 'File-manager',
        //     },
        //     {
        //         path: '/components/apps/file-manager1',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //         title: 'File-manager1',
        //     },
        //     {
        //         path: '/components/apps/file-details',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //         title: 'File-details',
        //     },
        // ],
    },
    // {
    //     title: 'Elements',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="side-menu__icon"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //         >
    //             <path d="M20 17V7c0-2.168-3.663-4-8-4S4 4.832 4 7v10c0 2.168 3.663 4 8 4s8-1.832 8-4zM12 5c3.691 0 5.931 1.507 6 1.994C17.931 7.493 15.691 9 12 9S6.069 7.493 6 7.006C6.069 6.507 8.309 5 12 5zM6 9.607C7.479 10.454 9.637 11 12 11s4.521-.546 6-1.393v2.387c-.069.499-2.309 2.006-6 2.006s-5.931-1.507-6-2V9.607zM6 17v-2.393C7.479 15.454 9.637 16 12 16s4.521-.546 6-1.393v2.387c-.069.499-2.309 2.006-6 2.006s-5.931-1.507-6-2z" />
    //         </svg>
    //     ),
    //     type: 'sub',
    //     selected: false,
    //     active: false,
    //     children: [
    //         {
    //             path: '/components/elements/alerts',
    //             title: 'Alerts',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },

    //         {
    //             path: '/components/elements/breadcrumb',
    //             title: 'Breadcrumbs',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/button-group',
    //             title: 'Button Group',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/buttons',
    //             title: 'Buttons',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/badge',
    //             title: 'Badge',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/cards',
    //             title: 'Cards',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/dropdowns',
    //             title: 'Dropdowns',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/images&figures',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Images & Figures',
    //         },
    //         {
    //             path: '/components/elements/listgroup',
    //             title: 'List Group',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/navs-tabs',
    //             title: 'Navs &Tabs',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/media-object',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             title: 'Media Object',
    //         },

    //         {
    //             path: '/components/elements/pagination',
    //             title: 'Pagination',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/popovers',
    //             title: 'Popovers',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/progress',
    //             title: 'Progress',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/spinners',
    //             title: 'Spinners',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },

    //         {
    //             path: '/components/elements/tooltips',
    //             title: 'Tooltips',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/toasts',
    //             title: 'Toasts',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/tags',
    //             title: 'Tags',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             path: '/components/elements/typography',
    //             title: 'Typography',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //         },
    //     ],
    // },
    // {
    //     title: 'Advanced UI',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="side-menu__icon"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //         >
    //             <path d="M20.995 6.9a.998.998 0 0 0-.548-.795l-8-4a1 1 0 0 0-.895 0l-8 4a1.002 1.002 0 0 0-.547.795c-.011.107-.961 10.767 8.589 15.014a.987.987 0 0 0 .812 0c9.55-4.247 8.6-14.906 8.589-15.014zM12 19.897C5.231 16.625 4.911 9.642 4.966 7.635L12 4.118l7.029 3.515c.037 1.989-.328 9.018-7.029 12.264z" />
    //             <path d="m11 12.586-2.293-2.293-1.414 1.414L11 15.414l5.707-5.707-1.414-1.414z" />
    //         </svg>
    //     ),
    //     type: 'sub',
    //     selected: false,
    //     bookmark: true,
    //     active: false,
    //     children: [
    //         {
    //             path: '/components/advancedui/accordions-collapse',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Accordions & Collapse',
    //         },
    //         {
    //             path: '/components/advancedui/carousel',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             title: 'Carousel',
    //         },
    //         {
    //             path: '/components/advancedui/draggable-cards',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Draggable Cards',
    //         },
    //         {
    //             path: '/components/advancedui/modals-closes',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Modals & Closes',
    //         },
    //         {
    //             path: '/components/advancedui/navbar',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Navbar',
    //         },
    //         {
    //             path: '/components/advancedui/offcanvas',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Offcanvas',
    //         },
    //         {
    //             path: '/components/advancedui/placeholders',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Placeholders',
    //         },
    //         {
    //             path: '/components/advancedui/ratings',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Ratings',
    //         },
    //         {
    //             path: '/components/advancedui/swiperjs',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Swiper JS',
    //         },
    //         {
    //             path: '/components/advancedui/timeline',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             title: 'Timeline',
    //         },

    //         {
    //             path: '/components/advancedui/search',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             title: 'Search',
    //         },
    //         {
    //             path: '/components/advancedui/userlist',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             title: 'Userlist',
    //         },
    //         {
    //             path: '/components/advancedui/blog',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             title: 'Blog',
    //         },
    //         {
    //             path: '/components/advancedui/blog-details',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             title: 'Blog-details',
    //         },
    //         {
    //             path: '/components/advancedui/edit-post',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             title: 'Edit-post',
    //         },
    //     ],
    // },

    {
        menutitle: 'GERENCIAMENTO',
    },
    {
        title: 'Produtos',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M20 7h-1.209A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.407 3.57 10.269 2 8.5 2 6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H4c-1.103 0-2 .897-2 2v2c0 1.103.897 2 2 2v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-4.5-3c.827 0 1.5.673 1.5 1.5C17 7 16.374 7 16 7h-2.478c.511-1.576 1.253-3 1.978-3zM7 5.5C7 4.673 7.673 4 8.5 4c.888 0 1.714 1.525 2.198 3H8c-.374 0-1 0-1-1.5zM4 9h7v2H4V9zm2 11v-7h5v7H6zm12 0h-5v-7h5v7zm-5-9V9.085L13.017 9H20l.001 2H13z" />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/components/icons/icons',
        // children: [
        //     {
        //         title: 'Authentication',
        //         type: 'sub',
        //         selected: false,
        //         active: false,
        //         children: [
        //             {
        //                 path: '/components/pages/authentication/sign-in',
        //                 title: 'Sign In',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/authentication/sign-up',
        //                 title: 'Sign Up',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/authentication/forgot-password',
        //                 title: 'Forgot Password',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/authentication/reset-password',
        //                 title: 'Reset Password',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/authentication/lockscreen',
        //                 title: 'Lockscreen',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/authentication/underconstruction',
        //                 title: 'UnderConstruction',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/authentication/404',
        //                 title: '404 Error',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/authentication/500',
        //                 title: '500 Error',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/authentication/501',
        //                 title: '501 Error',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //         ],
        //     },

        //     {
        //         title: 'E-Commerce',
        //         type: 'sub',
        //         selected: false,
        //         active: false,
        //         children: [
        //             {
        //                 path: '/components/pages/e-commerce/shop',
        //                 title: 'Shop',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/e-commerce/product-details',
        //                 title: 'Product Details',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/e-commerce/cart',
        //                 title: 'Cart',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/e-commerce/checkout',
        //                 title: 'Checkout',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/e-commerce/wish-list',
        //                 title: 'Wish-list',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //         ],
        //     },

        //     {
        //         path: '/components/pages/profile',
        //         title: 'Profile',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //     },
        //     {
        //         path: '/components/pages/notification-list',
        //         title: 'Notification-list',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //     },
        //     {
        //         path: '/components/pages/about-us',
        //         title: 'About Us',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //     },
        //     {
        //         path: '/components/pages/settings',
        //         title: 'Settings',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //     },
        //     {
        //         title: 'Mail',
        //         type: 'sub',
        //         selected: false,
        //         active: false,
        //         children: [
        //             {
        //                 path: '/components/pages/mail/mail',
        //                 title: 'Mail',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/mail/mail-compose',
        //                 title: 'Mail Compose',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/mail/read-mail',
        //                 title: 'Read-Mail',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/mail/mail-settings',
        //                 title: 'Mail-Settings',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //             {
        //                 path: '/components/pages/mail/chat',
        //                 title: 'Chat',
        //                 type: 'link',
        //                 active: false,
        //                 selected: false,
        //             },
        //         ],
        //     },
        //     {
        //         path: '/components/pages/invoice',
        //         title: 'Invoice',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //     },
        //     {
        //         path: '/components/pages/pricing',
        //         title: 'Pricing',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //     },

        //     {
        //         path: '/components/pages/todotask',
        //         title: 'Todo Task',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //     },
        //     {
        //         path: '/components/pages/faqs',
        //         title: 'FAQS',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //     },
        //     {
        //         path: '/components/pages/empty-page',
        //         title: 'Empty Page',
        //         type: 'link',
        //         active: false,
        //         selected: false,
        //     },
        // ],
    },
    {
        title: 'Cupom',
        icon: (
            <svg
                className="side-menu__icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M21.7071 3.70711C22.0976 3.31658 22.0976 2.68342 21.7071 2.29289C21.3166 1.90237 20.6834 1.90237 20.2929 2.29289L2.29289 20.2929C1.90237 20.6834 1.90237 21.3166 2.29289 21.7071C2.68342 22.0976 3.31658 22.0976 3.70711 21.7071L21.7071 3.70711Z" />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11 6.5C11 8.98528 8.98528 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5ZM4.00693 6.5C4.00693 7.87689 5.12311 8.99307 6.5 8.99307C7.87689 8.99307 8.99307 7.87689 8.99307 6.5C8.99307 5.12311 7.87689 4.00693 6.5 4.00693C5.12311 4.00693 4.00693 5.12311 4.00693 6.5Z"
                />
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 17.5C22 19.9853 19.9853 22 17.5 22C15.0147 22 13 19.9853 13 17.5C13 15.0147 15.0147 13 17.5 13C19.9853 13 22 15.0147 22 17.5ZM15.0069 17.5C15.0069 18.8769 16.1231 19.9931 17.5 19.9931C18.8769 19.9931 19.9931 18.8769 19.9931 17.5C19.9931 16.1231 18.8769 15.0069 17.5 15.0069C16.1231 15.0069 15.0069 16.1231 15.0069 17.5Z"
                />
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/components/icons/icons',
    },
    {
        title: 'Categorias',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/components/icons/icons',
    },

    {
        menutitle: 'USUÁRIOS',
    },
    {
        title: 'Usuários',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="side-menu__icon person"
                width="24"
                height="24"
                stroke="#fff"
                fill="nonem "
                viewBox="0 0 24 24"
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                        d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="#fff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        fill="none"
                    />{' '}
                </g>
            </svg>
        ),
        type: 'link',
        selected: false,
        path: '/components/icons/icons',
    },
    // {
    //     title: 'Charts',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="side-menu__icon"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //         >
    //             <path d="M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H4c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9c0-1.103-.897-2-2-2zM4 11h4v8H4v-8zm6-1V4h4v15h-4v-9zm10 9h-4V9h4v10z" />
    //         </svg>
    //     ),
    //     type: 'sub',
    //     children: [
    //         {
    //             title: 'Apex Charts',
    //             type: 'sub',
    //             menusub: true,
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             children: [
    //                 {
    //                     path: '/components/charts/apexcharts/linecharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Line Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/areacharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Area Charts ',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/columncharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Column Charts ',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/barcharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Bar Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/mixedcharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Mixed Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/rangeareacharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Range Area Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/timelinecharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Timeline Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/candlestickcharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'CandleStick Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/boxplotcharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Boxplot Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/bubblecharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Bubble Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/scattercharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Scatter Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/heatmapcharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Heatmap Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/treemapcharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Treemap Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/piecharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Pie Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/radialbarcharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Radialbar Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/radarcharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Radar Charts',
    //                 },
    //                 {
    //                     path: '/components/charts/apexcharts/polarareacharts',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Polararea Charts',
    //                 },
    //             ],
    //         },
    //         {
    //             path: '/components/charts/chartjscharts',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'ChartJS Charts',
    //         },
    //         {
    //             path: '/components/charts/echartcharts',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Echart Charts',
    //         },
    //     ],
    // },
    // {
    //     menutitle: 'MULTI LEVEL',
    // },
    // {
    //     title: 'Menu Levels',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="side-menu__icon"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //         >
    //             <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
    //         </svg>
    //     ),
    //     type: 'sub',
    //     active: false,
    //     selected: false,
    //     dirchange: false,
    //     children: [
    //         {
    //             path: '',
    //             title: 'Level-1',
    //             type: 'empty',
    //             active: false,
    //             selected: false,
    //         },
    //         {
    //             title: 'Level-2',
    //             type: 'sub',
    //             selected: false,
    //             active: false,
    //             children: [
    //                 {
    //                     path: '',
    //                     title: 'Level-2.1',
    //                     type: 'empty',
    //                     active: false,
    //                     selected: false,
    //                 },
    //                 {
    //                     title: 'Level-2.2',
    //                     type: 'sub',
    //                     active: false,
    //                     selected: false,
    //                     children: [
    //                         {
    //                             path: '',
    //                             title: 'Level-2.2.1',
    //                             type: 'empty',
    //                             active: false,
    //                             selected: false,
    //                         },
    //                         {
    //                             path: '',
    //                             title: 'Level-2.2.2',
    //                             type: 'empty',
    //                             active: false,
    //                             selected: false,
    //                         },
    //                     ],
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     menutitle: 'COMPONENTS',
    // },
    // {
    //     title: 'Forms',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="side-menu__icon"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //         >
    //             <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z" />
    //         </svg>
    //     ),
    //     type: 'sub',
    //     selected: false,
    //     active: false,
    //     children: [
    //         {
    //             title: 'Form Elements',
    //             type: 'sub',
    //             menusub: true,
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             children: [
    //                 {
    //                     path: '/components/forms/formelements/inputs',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Inputs',
    //                 },
    //                 {
    //                     path: '/components/forms/formelements/checks&radios',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'checks&Radios',
    //                 },
    //                 {
    //                     path: '/components/forms/formelements/inputgroups',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Input Group',
    //                 },
    //                 {
    //                     path: '/components/forms/formelements/formselect',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Form Select',
    //                 },
    //                 {
    //                     path: '/components/forms/formelements/rangeslider',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Range Slider',
    //                 },
    //                 {
    //                     path: '/components/forms/formelements/inputmasks',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Input Masks',
    //                 },
    //                 {
    //                     path: '/components/forms/formelements/fileuploads',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'File Uploads',
    //                 },
    //                 {
    //                     path: '/components/forms/formelements/datetimepicker',
    //                     title: 'Date,Time Picker',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                 },
    //                 {
    //                     path: '/components/forms/formelements/colorpickers',
    //                     title: 'Color Pickers',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                 },
    //             ],
    //         },
    //         {
    //             path: '/components/forms/floatinglabels',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Floating Labels',
    //         },
    //         {
    //             path: '/components/forms/formlayouts',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Form Layouts',
    //         },
    //         {
    //             title: 'Form Editors',
    //             type: 'sub',
    //             menusub: true,
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             children: [
    //                 {
    //                     path: '/components/forms/formeditors/quilleditor',
    //                     type: 'link',
    //                     active: false,
    //                     selected: false,
    //                     dirchange: false,
    //                     title: 'Quill Editors',
    //                 },
    //             ],
    //         },
    //         {
    //             path: '/components/forms/validation',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Validation',
    //         },
    //         {
    //             path: '/components/forms/select2',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Select2',
    //         },
    //     ],
    // },
    // {
    //     title: 'Tables',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="side-menu__icon"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //         >
    //             <path d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 2 .001 4H5V5h14zM5 11h8v8H5v-8zm10 8v-8h4.001l.001 8H15z" />
    //         </svg>
    //     ),
    //     type: 'sub',
    //     selected: false,
    //     active: false,
    //     children: [
    //         {
    //             path: '/components/tables/tables',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Tables',
    //         },
    //         {
    //             path: '/components/tables/gridjs',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Grid JS Tables',
    //         },
    //         {
    //             path: '/components/tables/datatables',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Data Tables',
    //         },
    //     ],
    // },
    // {
    //     title: 'Widgets',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="side-menu__icon"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //         >
    //             <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11 4h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6h-4v-4h4v4zM17 3c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
    //         </svg>
    //     ),
    //     type: 'link',
    //     selected: false,
    //     path: '/components/widgets/widgets',
    // },
    // {
    //     title: 'Maps',
    //     icon: (
    //         <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="side-menu__icon"
    //             width="24"
    //             height="24"
    //             viewBox="0 0 24 24"
    //         >
    //             <path d="M2.002 9.63c-.023.411.207.794.581.966l7.504 3.442 3.442 7.503c.164.356.52.583.909.583l.057-.002a1 1 0 0 0 .894-.686l5.595-17.032c.117-.358.023-.753-.243-1.02s-.66-.358-1.02-.243L2.688 8.736a1 1 0 0 0-.686.894zm16.464-3.971-4.182 12.73-2.534-5.522a.998.998 0 0 0-.492-.492L5.734 9.841l12.732-4.182z" />
    //         </svg>
    //     ),
    //     type: 'sub',
    //     selected: false,
    //     active: false,
    //     children: [
    //         {
    //             path: '/components/maps/leafletmaps',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Leaflet Maps',
    //         },
    //         {
    //             path: '/components/maps/vectormaps',
    //             type: 'link',
    //             active: false,
    //             selected: false,
    //             dirchange: false,
    //             title: 'Vector Maps',
    //         },
    //     ],
    // },
];
