export default function UserProfile({params}: any) {
    return (
        <div className="flex-auto flex flex-col justify-center items-center">
            <h1>Profile</h1>

            <p className="text-4xl">Profile Page</p>
            <span className="p-2 rounded bg-orange-500 text-black">{params.id}</span>
        </div>
    )
}