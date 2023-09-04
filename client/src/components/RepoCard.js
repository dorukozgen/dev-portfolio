import { useEffect } from "react";

function RepoCard(props) {

    return (
        <a href={props.href} target="_blank" className="inline-block h-fit w-fit shadow-lg" >
            <div className="flex flex-col w-fit h-fit bg-zinc-800 flex-wrap gap-3 p-4 cursor-pointer rounded overflow-hidden transition ease-in-out delay-[0.2ms] shadow-lg hover:scale-125 hover:shadow-xl">
                <div>
                    <h2 className="text-white md:text-2xl text-base">{props.name}</h2>
                </div>
                <div className="w-[20vh] min-w-[300px]">
                    <p className="text-white md:text-xl text-sm">{props.description}</p>
                </div>
            </div>
        </a>
    )
}

export default RepoCard;