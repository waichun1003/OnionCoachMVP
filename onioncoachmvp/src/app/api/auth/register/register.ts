import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const { name, email, hollandCode, answers } = await req.json()

        // Validate input
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            )
        }

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hollandCode,
                assessments: {
                    create: {
                        answers,
                        hollandCode
                    }
                }
            },
            include: {
                assessments: true
            }
        })

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            hollandCode: user.hollandCode
        })
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
