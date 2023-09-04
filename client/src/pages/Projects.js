import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

import RepoCard from "../components/RepoCard";

function Projects() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch(window.env.GITHUB_API_URL)
            .then((response) => response.json())
            .then((data) => 
                setRepos(
                    data.filter((repo) => repo.description !== null && repo.description !== "" && !repo.name.includes("dorukozgen"))
                )
            );
    }, []);

    return (
        <div className="h-screen">
            <nav className="flex items-center h-[5vh] min-h-[60px]">
                <BackButton className="ml-3"/>
            </nav>
            <div className="flex md:items-center items-start mt-[3vh] md:mt-0 justify-center h-[95vh]">
                <div className='container flex lg:flex-row flex-col flex-wrap gap-6 items-center justify-center w-full mx-auto h-fit md:mt-0'>
                    {repos.map((repo) => (
                        <RepoCard href={repo.html_url} name={repo.name} description={repo.description} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;