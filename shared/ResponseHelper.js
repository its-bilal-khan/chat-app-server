module.exports = {
    GetErrorMessage: (e) => {
        return e.errors
            ? Object.keys(e.errors).map((key) => (key = e.errors[key].message))
            : e
    },
}
