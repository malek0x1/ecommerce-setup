import { useEcommerceContext } from "@/lib/context/context";
import { Sheet, SheetClose, SheetContent, SheetHeader } from "../ui/sheet";
import MobileNavItem from "./MobileNavItem";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { LoggedInNavigations, LoggedOutNavigations } from "@/lib/data";
import { motion } from "framer-motion"
const MobileNav = ({ isOpen, setIsOpen }) => {
    const { categories } = useEcommerceContext()
    const session = useSession()

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} >
            <SheetContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                side="left" className="mobileNavbar flex flex-col ">
                <SheetHeader className="text-left">
                    <SheetClose className="w-fit"  >
                        <Image
                            src="/assets/icons/close.svg"
                            unoptimized
                            width={25}
                            alt="close"
                            height={25}
                        />
                    </SheetClose>
                </SheetHeader>

                <motion.div
                    transition={{ duration: .4 }}
                    initial={{ opacity: 0, x: -50, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: -1, scale: 1 }}
                >

                    <div className="overflow-y-auto overflow-x-hidden flex-1">
                        <div className="space-y-2 pt-8 overflow-x-hidden">
                            {
                                !categories.loading ?
                                    categories.categories.length > 0 && [...categories.categories].map((item, index) => (
                                        <div key={item.id} onClick={() => { setIsOpen(false) }} className="">
                                            <MobileNavItem index={index} label={item.name} link={`/collection/${item.slug}`} />
                                        </div>
                                    ))
                                    :
                                    <Skeleton className="gap-5" duration={0.8} count={8} height={20} />
                            }

                            {!categories.loading &&
                                [...(session.status === "authenticated" ? LoggedInNavigations : LoggedOutNavigations)].map((item, index) => (
                                    <div key={item.id} onClick={() => { setIsOpen(false) }} className="">
                                        <MobileNavItem index={index * 2} label={item.name} link={`${item.slug}`} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </motion.div>
            </SheetContent>
        </Sheet>
    )
}


export default MobileNav