export const loginRedirectURL = () => {
    console.log(window.location)
    let redirectParam = window.location.search;
    return redirectParam.split('redirect=')[1]
}