
const Todo = (props) => {
    return(
        <>
            <h2> Todo: {props.description} </h2>
            <p> Status: {props.status} </p>
        </>
    );
}

export default Todo;