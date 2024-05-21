/** @type {import('next').NextConfig} */

const nextJs = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.0.121',
                port: '8080',
                pathname: '/api/picture/**',
            },
        ],
    },
}

export default nextJs
