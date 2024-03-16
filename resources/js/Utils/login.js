export const loginRedirectURL = () => {
    console.log(window.location)
    let redirectParam = window.location.search;
    return redirectParam.split('redirect=')[1]
}

export const getCurrentUrlRedirect = () => {
    console.log('Current url to redirect: ', window.location.href)
    return window.location.href
}