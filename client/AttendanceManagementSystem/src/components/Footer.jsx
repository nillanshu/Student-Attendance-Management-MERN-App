import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
            <div className="copyright text-center my-auto">
                <span> &copy; {new Date().getFullYear()} - Developed with ❤️ by <a href="https://nillanshu-saini.netlify.app/" target="_blank" style={{color: '#0000ff', fontWeight: 'bold'}}>NILLANSHU SAINI</a> CS-AI DEPARTMENT
                </span>
            </div>
            </div>
        </footer>
    </>
  )
}

export default Footer