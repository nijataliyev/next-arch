import ChildRootLayoutComponent from "../../src/core/layouts/public/child-root-layout/child-root-layout.component";
import {useRouter} from "next/router";
import {useEffect} from "react";

const BlogId = () => {
    const router = useRouter();
    useEffect(() => {
        console.log(router)
    },[router])
    return (
        <ChildRootLayoutComponent>
            Blog Id
        </ChildRootLayoutComponent>
    )
}

export default BlogId;