const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}
const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part =>
                <div key={part.id}>
                    {part.name} {part.exercises}
                </div>
            )}
        </div>
    )
}

const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <strong>total of {sum} exercises</strong>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course