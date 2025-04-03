import Link from "next/link"
import { Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

export function Footer() {
    return (
        <footer className="py-8 bg-[#EDE6DC]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-gray-600 order-2 sm:order-1">
                        Copyright © 2024 All Rights Reserved
                    </div>
                    <div className="flex items-center gap-6 order-1 sm:order-2">
                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                            Terms of User
                        </Link>
                        <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                            Privacy Policy
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 order-3">
                        <Link href="#" className="text-gray-600 hover:text-gray-900">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900">
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900">
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900">
                            <Youtube className="h-5 w-5" />
                            <span className="sr-only">YouTube</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

