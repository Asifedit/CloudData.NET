import React from 'react'
import { Link } from 'react-router-dom'

function nav() {
  return (
      <div className="bg-lime-600 w-screen px-5 h-[60px] flex items-center justify-between ">
          <Link to={"/"} className="text-4xl">
              Asif
          </Link>
          <Link to={"/register"} className="text-4xl">
              register
          </Link>
      </div>
  );
}

export default nav