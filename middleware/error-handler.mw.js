exports.errorHandler = (error, req, res, next) => {
    console.log(error.message || "שגיא בסרבר, נא לנסות שנית")
    res.status(error.status || 500).json({continueWork: false, message: error.message || "שגיא בסרבר, נא לנסות שנית"})
}