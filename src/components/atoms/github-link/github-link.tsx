import Image from "next/image"
import GitHubIcon from "@/assets/icons/github-icon.svg"

export default function GitHubLink() {
    return (
        <a
            className="flex justify-center absolute right-2 top-1"
            href="https://github.com/noviceGuru/todo-list-next-tailwind/"
            target="_blank"
        >
            <Image src={GitHubIcon} alt="show-list-button" className="m-6 w-8 sm:w-14" />
        </a>
    )
}
