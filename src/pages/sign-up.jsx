import Layout from "@/components/Layout";
import TextField from "@/components/TextField";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem, FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SIGN_UP_FIELDS } from "@/lib/data";
import Button from "@/components/Button";
import { SIGNUP_SCHEMA } from "../lib/YupSchemas";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const form = useForm({
        resolver: zodResolver(SIGNUP_SCHEMA),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        },
    });
    const router = useRouter()
    const onSubmit = async (data) => {
        setIsLoading(true)

        try {
            setErrorMessage("")
            const res = await axios.post("/api/authv2/register", data);
            if (res.status == 200) {
                await signIn("register", {
                    email: data.email,
                    callbackUrl: "/"
                });
            }
        }
        catch (e) {
            setErrorMessage(e.response.data.message)
        }
        setIsLoading(false)
    }
    return (
        <Layout
            title="Signup Page"
            description=""
        >
            <div
                style={{ maxWidth: "500px", minHeight: "70vh" }}
                className="container w-full px-4  flex justify-center items-center gap-6 flex-col">
                <h2 className="uppercase text-2xl tracking-wide">SIGNUP</h2>
                <p className="text-thin text-xs text-gray-500">Please fill the fields below:</p>
                <Form {...form} className="">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3 w-full">
                        {SIGN_UP_FIELDS.map((fieldItem) => (
                            <FormField
                                key={fieldItem.id}
                                control={form.control}
                                name={fieldItem.name}
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormControl>
                                            <TextField
                                                {...field}
                                                placeholder={fieldItem?.placeholder}
                                                type={fieldItem.type}
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        {errorMessage ? <p className="text-thin text-xs text-red-500">
                            {errorMessage}
                        </p> : <></>}
                        <Button disabled={isLoading} label={isLoading ? <Spinner color="white" /> : "Submit"} />
                    </form>
                </Form>
                <Link href="/login">
                    <p className="text-thin text-gray-500 text-xs underline">Dont have an account? Create one</p>
                </Link>
            </div>
        </Layout>
    )
}

export default Login