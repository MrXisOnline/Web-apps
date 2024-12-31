import Markdown from "react-markdown" ;

export default function ClaudeRecipe({recipe}) {
    return (
        <>
            <Markdown>
                {recipe}
            </Markdown>
        </>
    )
}