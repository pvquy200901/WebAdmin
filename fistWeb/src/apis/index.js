import { backendDomain } from "./configURL"

const SummaryApi = {
    signUP : {
        url : `${backendDomain}/api/Customer/createCustomer`,
        method : "post"
    },
    updateUser : {
        url : `${backendDomain}/api/Customer/editCustomer`,
        method : "put"
    },
    signIn : {
        url : `${backendDomain}/api/Customer/loginCustomer`,
        method : "post"
    },
    deleteOrder : {
        url : `${backendDomain}/api/Order/deleteOrder`,
        method : "delete"
    },
    confirmOrder : {
        url : `${backendDomain}/api/Order/confirmOrder`,
        method : "post"
    },
    setStateOrder : {
        url : `${backendDomain}/api/Order/setStateOrder`,
        method : "post"
    },
    orders : {
        url : `${backendDomain}/api/User/getListOrderForUser`,
        method : "get"
    },
    ordersFinish : {
        url : `${backendDomain}/api/Order/getListFinishOrder`,
        method : "get"
    },
    current_user : {
        url : `${backendDomain}/api/Customer/getDetailCustomer`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomain}/api/all-user`,
        method : 'get'
    },
    // updateUser : {
    //     url : `${backendDomain}/api/update-user`,
    //     method : "post"
    // },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomain}/api/User/getListShop`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomain}/api/Customer/getDetailProduct`,
        method : 'get'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/Customer/addToCart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/Customer/getCountCartProduct`,
        method : 'get'
    },
    getListCartProduct : {
        url : `${backendDomain}/api/Customer/getListCartProduct`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/Customer/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/Customer/delete-cart-product`,
        method : 'post'
    },
    createOrder : {
        url : `${backendDomain}/api/Order/createOrder`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomain}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomain}/api/Customer/getListProduct`,
        method : 'get'
    },
    bestSeller : {
        url : `${backendDomain}/api/Customer/getListProductBestSeller`,
        method : 'get'
    },
    getImage : {
        url : `${backendDomain}/api/File/image/`,
        method : 'get'
    }
}


export default SummaryApi