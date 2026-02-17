"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { User, Send, MessageSquare, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

const formSchema = z.object({
    guestName: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
    guestEmail: z.string().email("Noto'g'ri email manzili"),
    content: z.string().min(10, "Fikr kamida 10 ta belgidan iborat bo'lishi kerak").max(2000, "Fikr juda uzun"),
})

interface Comment {
    id: string
    guestName: string
    content: string
    createdAt: string
    parentCommentId: string | null
    replies?: Comment[]
}

interface CommentsSectionProps {
    blogPostId: string
}

export function CommentsSection({ blogPostId }: CommentsSectionProps) {
    const [comments, setComments] = useState<Comment[]>([])
    const [isLoading, setIsLoading] = useState(false) // For fetching comments
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            guestName: "",
            guestEmail: "",
            content: "",
        },
    })

    // Fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            // Only fetch if blogPostId is present
            if (!blogPostId) return

            setIsLoading(true)
            try {
                const res = await fetch(`https://portfolio-backend-rh0y.onrender.com/api/v1/blog-comments?blogPostId=${blogPostId}&status=approved`)
                if (res.ok) {
                    const data = await res.json()
                    if (data.data) {
                        setComments(data.data)
                    }
                }
            } catch (error) {
                console.error("Failed to fetch comments", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchComments()
    }, [blogPostId])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            const response = await fetch("https://portfolio-backend-rh0y.onrender.com/api/v1/blog-comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    blogPostId,
                    ...values,
                }),
            })

            if (!response.ok) {
                throw new Error("Xatolik yuz berdi")
            }

            toast.success("Fikringiz qabul qilindi!", {
                description: "Moderatsiyadan o'tgandan so'ng chop etiladi.",
            })
            form.reset()
        } catch (error) {
            toast.error("Xatolik yuz berdi", {
                description: "Iltimos, qaytadan urinib ko'ring.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section className="py-12 bg-muted/30 rounded-3xl mt-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="flex items-center gap-3 mb-8">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Fikrlar ({comments.length})</h2>
                </div>

                {/* Existing Comments List */}
                <div className="space-y-8 mb-12">
                    {isLoading ? (
                        <p className="text-muted-foreground text-center">Fikrlar yuklanmoqda...</p>
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="flex gap-4">
                                <Avatar>
                                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                        {comment.guestName.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-foreground">{comment.guestName}</h3>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(comment.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{comment.content}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 border border-dashed border-muted-foreground/30 rounded-xl">
                            <p className="text-muted-foreground">Hozircha fikrlar yo&apos;q. Birinchi bo&apos;lib fikr bildiring!</p>
                        </div>
                    )}
                </div>

                <div className="border-t border-border pt-8">
                    <h3 className="text-xl font-bold mb-6">Fikr qoldirish</h3>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="guestName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ismingiz</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ismingizni kiriting" {...field} className="bg-background" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="guestEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email@example.com" {...field} className="bg-background" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fikringiz</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Fikringizni yozib qoldiring..."
                                                className="resize-none min-h-[120px] bg-background"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                                {isSubmitting ? (
                                    <>Yuborilmoqda...</>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Yuborish
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}
