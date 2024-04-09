interface IconType {
    title: string;
    viewBox: string;
    path: string;
}

const icons: { [key: string]: IconType } = {
    profile: {
        title: "profile",
        viewBox: "0 0 45.365231 45.333984",
        path: "M 22.666016,1 C 10.662676,1 1,10.662703 1,22.666016 1,28.169524 3.0355656,33.178382 6.3925781,36.992187 10.169631,32.173591 16.041298,29.083984 22.666016,29.083984 h 0.0332 c 6.624718,0 12.496384,3.089607 16.273437,7.908203 3.357013,-3.813805 5.392578,-8.822663 5.392578,-14.326171 C 44.365234,10.662703 34.702558,1 22.699219,1 Z m 0.0098,10.027344 h 0.01367 c 4.947525,0 8.931641,3.984121 8.931641,8.93164 0,4.94752 -3.984116,8.929688 -8.931641,8.929688 h -0.01367 c -4.947525,0 -8.93164,-3.982168 -8.93164,-8.929688 0,-4.947519 3.984115,-8.93164 8.93164,-8.93164 z m 16.29684,25.964843 C 35.195603,32.173591 29.323937,29.083984 22.699219,29.083984 h -0.0332 c -6.624718,0 -12.496385,3.089607 -16.2734379,7.908203 3.9647299,4.504216 9.7736189,7.341797 16.2734379,7.341797 h 0.0332 c 6.499819,0 12.308707,-2.837581 16.273437,-7.341797 z M 22.675781,11.027344 c -4.947525,0 -8.93164,3.984121 -8.93164,8.93164 0,4.94752 3.984115,8.929688 8.93164,8.929688 h 0.01367 c 4.947525,0 8.931641,-3.982168 8.931641,-8.929688 0,-4.947519 -3.984116,-8.93164 -8.931641,-8.93164 z",
    },
    edit: {
        title: "edit",
        viewBox: "0 -960 960 960",
        path: "M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z",
    },
    favorite: {
        title: "favorite",
        viewBox: "0 0 24 24",
        path: "M12 21L10.55 19.7C8.86667 18.1833 7.475 16.875 6.375 15.775C5.275 14.675 4.4 13.6875 3.75 12.8125C3.1 11.9375 2.64583 11.1333 2.3875 10.4C2.12917 9.66666 2 8.91666 2 8.14999C2 6.58333 2.525 5.27499 3.575 4.22499C4.625 3.17499 5.93333 2.64999 7.5 2.64999C8.36667 2.64999 9.19167 2.83333 9.975 3.19999C10.7583 3.56666 11.4333 4.08333 12 4.74999C12.5667 4.08333 13.2417 3.56666 14.025 3.19999C14.8083 2.83333 15.6333 2.64999 16.5 2.64999C18.0667 2.64999 19.375 3.17499 20.425 4.22499C21.475 5.27499 22 6.58333 22 8.14999C22 8.91666 21.8708 9.66666 21.6125 10.4C21.3542 11.1333 20.9 11.9375 20.25 12.8125C19.6 13.6875 18.725 14.675 17.625 15.775C16.525 16.875 15.1333 18.1833 13.45 19.7L12 21ZM12 18.3C13.6 16.8667 14.9167 15.6375 15.95 14.6125C16.9833 13.5875 17.8 12.6958 18.4 11.9375C19 11.1792 19.4167 10.5042 19.65 9.91249C19.8833 9.32083 20 8.73333 20 8.14999C20 7.14999 19.6667 6.31666 19 5.64999C18.3333 4.98333 17.5 4.64999 16.5 4.64999C15.7167 4.64999 14.9917 4.87083 14.325 5.31249C13.6583 5.75416 13.2 6.31666 12.95 6.99999H11.05C10.8 6.31666 10.3417 5.75416 9.675 5.31249C9.00833 4.87083 8.28333 4.64999 7.5 4.64999C6.5 4.64999 5.66667 4.98333 5 5.64999C4.33333 6.31666 4 7.14999 4 8.14999C4 8.73333 4.11667 9.32083 4.35 9.91249C4.58333 10.5042 5 11.1792 5.6 11.9375C6.2 12.6958 7.01667 13.5875 8.05 14.6125C9.08333 15.6375 10.4 16.8667 12 18.3Z",
    },
    favoriteFilled: {
        title: "favoriteFilled",
        viewBox: "0 0 24 24",
        path: "M 12,21 10.55,19.7 C 8.86667,18.1833 7.475,16.875 6.375,15.775 5.275,14.675 4.4,13.6875 3.75,12.8125 3.1,11.9375 2.64583,11.1333 2.3875,10.4 2.12917,9.66666 2,8.91666 2,8.14999 c 0,-1.56666 0.525,-2.875 1.575,-3.925 1.05,-1.05 2.35833,-1.575 3.925,-1.575 0.86667,0 1.69167,0.18334 2.475,0.55 0.7833,0.36667 1.4583,0.88334 2.025,1.55 0.5667,-0.66666 1.2417,-1.18333 2.025,-1.55 0.7833,-0.36666 1.6083,-0.55 2.475,-0.55 1.5667,0 2.875,0.525 3.925,1.575 1.05,1.05 1.575,2.35834 1.575,3.925 0,0.76667 -0.1292,1.51667 -0.3875,2.25001 -0.2583,0.7333 -0.7125,1.5375 -1.3625,2.4125 -0.65,0.875 -1.525,1.8625 -2.625,2.9625 -1.1,1.1 -2.4917,2.4083 -4.175,3.925 z",
    }
}

interface IconProps {
    variant: keyof typeof icons;
    size?: number;
    backgroundColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
}

export default function Icon({
                                 variant,
                                 size,
                                 backgroundColor,
                                 strokeColor,
                                 strokeWidth,
                                 ...rest
                             }: Readonly<IconProps>) {
    return (
        <svg
            className="icon-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={icons[variant].viewBox}
            width={size}
            fill={backgroundColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            {...rest}
        >
            <title>{icons[variant].title}</title>
            <path d={icons[variant].path}/>
        </svg>
    );
}