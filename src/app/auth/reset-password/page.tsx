

export const page = () => {
    return (
        <div className="page">
            <h1>Reset Password</h1>
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm New Password" />
            <button>Submit</button>
        </div>
    )
}

export default page;