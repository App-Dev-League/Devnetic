import Image from "next/image"
export default function WindowsBadge() {
    return (
        <a style={{marginTop: "10px", cursor: "pointer"}} href="https://github.com/App-Dev-League/Devnetic/releases">
            <Image
            alt="Download for Windows"
            src="/images/windows-badge.png"
            width="150px"
            height="43px"
        />
        </a>
    )
}