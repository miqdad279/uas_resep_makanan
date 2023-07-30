import { Link } from "@inertiajs/react"

const isResep = (resep) => {
    return resep.map((data, i) => {
        return (
            <Link href={`/resep-detail/${data.id}`} key={i} className="card w-full md:w-auto bg-base-100 shadow-xl">
                <figure><img src="https://plus.unsplash.com/premium_photo-1663852297514-2211cfb8ae9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.title}
                    </h2>
                    {/* <p>{data.description}</p> */}
                    <div className="card-actions justify-end">
                        <div className="badge badge-inline">{data.category}</div>
                        <div className="badge badge-outline">{data.author}</div>
                    </div>
                </div>
            </Link>
        )
    })
}

const noResep = () => {
    return (
        <div>Belum ada resep</div>
    )
}

const ResepList = ({ resep }) => {
    return !resep ? noResep() : isResep(resep)
}

export default ResepList