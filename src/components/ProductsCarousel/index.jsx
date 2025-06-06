import { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import commerce from "../../lib/commerce"
import ProductCard from '../Card'
import SkeletonCard from '../Card/SkeletonCard'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import AnimatedComponent from '../AnimationComponent'

const ProductsCarousel = ({ collection }) => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const handleProducts = async () => {
            const productsData = await commerce.products.list({
                category_slug: [collection],
                limit: 6,
                sortBy: "created",
                sortDirection: "desc"
            })
            setProducts(productsData.data)
            setIsLoading(false)
        }
        handleProducts()
    }, [])
    return (
        <Carousel opts={{
            dragFree: true,
        }}>

            {
                isLoading ? (
                    <div className="relative flex justify-between pt-4  px-2 items-center">
                        <Skeleton duration={0.8} count={1} height={20} width={120} />
                        <Skeleton duration={0.8} count={1} height={20} width={50} />
                    </div>
                ) : (
                    <AnimatedComponent>

                        <div className="relative flex  justify-between px-2 pt-4 items-center">
                            <p className="text-left text-lg uppercase tracking-wider">{collection} Collection</p>
                            <div
                                style={{
                                    fontSize: "10px"
                                }}
                                className="underline  uppercase">
                                <Link prefetch={false} href={`/collection/${collection}`}>
                                    Show All
                                </Link>
                            </div>
                        </div>
                    </AnimatedComponent>
                )
            }
            <AnimatedComponent>

                <CarouselContent className="ml-1 gap-1 mt-4 items-center">
                    {isLoading ?
                        [1, 2, 3, 4].map(item => (
                            <CarouselItem key={item} className="lg:basis-1/4 pl-0 basis-1/2">
                                <SkeletonCard />
                            </CarouselItem>
                        ))
                        : products.length > 0 &&
                        products.map(item => (
                            <CarouselItem key={item.id} className="lg:basis-1/4 pl-0 basis-1/2">
                                <ProductCard product={item} />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </AnimatedComponent>
        </Carousel>
    )
}

export default ProductsCarousel