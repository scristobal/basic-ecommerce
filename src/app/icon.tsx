import { ImageResponse } from 'next/server';
import { SVGProps } from 'react';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32
};

export const contentType = 'image/png';

const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        className="with-icon_icon__MHUeb"
        data-testid="geist-icon"
        fill="none"
        height={24}
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        width={24}
        style={{
            color: '#7350FF',
            width: 24,
            height: 24
        }}
        {...props}>
        <circle cx={9} cy={21} r={1} />
        <circle cx={20} cy={21} r={1} />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
);

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <SVGComponent />
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size
        }
    );
}
