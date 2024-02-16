import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
            <div className="copyright text-center my-auto">
                <span> &copy; {new Date().getFullYear()} - Developed with ❤️ by NILLANSHU SAINI CS-AI DEPARTMENT
                </span>
            </div>
            </div>
        </footer>
    </>
  )
}

export default Footer