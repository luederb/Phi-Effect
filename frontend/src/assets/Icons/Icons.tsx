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