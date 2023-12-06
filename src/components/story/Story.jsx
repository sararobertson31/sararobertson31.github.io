import "./story.css";

const Story = ({title, content, subtitle}) => {
    console.log(content)
    return (
        <div className="story-card">
            <h2 className="story-title">{title}</h2>
            {subtitle ? <h4 className="story-subtitle">{subtitle}</h4> : <></>}
            <div className="story-content" dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
    );
};

export default Story;