import React from 'react';
import { Link } from 'react-router-dom'

export default function Login() {


    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">

            <div className="shadow-lg mt-5 p-5 mb-5 bg-body rounded">
                <h1 className="mb-5">Tela de login</h1>
                <input
                    type="email"
                    disabled
                    name="email"
                    placeholder="rodrigo.s.silverio@outlook.com"
                    className="form-control mb-2"
                />
                <input
                    disabled
                    type="password"
                    placeholder="*******"
                    name="password"

                    className="form-control mb-2"
                />
                <Link to="/agenda"> <button className="btn w-100 btn-primary">Entrar</button></Link>

            </div>
        </div>
    )
}