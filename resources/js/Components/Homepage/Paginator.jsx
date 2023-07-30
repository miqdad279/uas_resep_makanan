import { Link } from "@inertiajs/react";

const Paginator = ({ meta }) => {
    const prev = meta.links[0].url;
    const next = meta.links[meta.links.length - 1].url;
    const current = meta.current_page;

    return (
        <div className="join">
            {prev && <Link href={prev} className="join-item btn btn-outline bg-[#F16039] text-white">«</Link>}
            <Link className="join-item btn btn-outline bg-[#F16039] text-white">{current}</Link>
            {next && <Link href={next} className="join-item btn btn-outline bg-[#F16039] text-white">»</Link>}
        </div>
    )
}

export default Paginator