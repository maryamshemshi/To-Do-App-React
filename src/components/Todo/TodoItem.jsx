const checkBoxStyle = {
    accentColor: "green",
    width: '1rem',
    height: '1rem',
    top:'-.8rem'
}

export default function TodoItem({user, handleCategory, deleteAction, editAction, doneAction}) {
    return <li key={user.id}
               className="row mx-auto justify-content-between border p-3 my-3 rounded shadow position-relative">
        <input className="form-check-input btn-success my-2 position-absolute" style={checkBoxStyle}
               type="checkbox"
               checked={user.is_done}
               onChange={(e) => doneAction(user)}/>

        <button className="btn btn-primary btn-sm my-auto" onClick={() => handleCategory(user.category)}>
            <span className="my-auto spinner-grow spinner-grow-sm"></span>
            {user.category}
        </button>

        <span className={`my-auto font-weight-bolder ${user.is_done && 'text-muted'}`} style={{textDecoration: user.is_done ? 'line-through' : ''}}>
            {user.title}
        </span>

        <div>
            <button className="btn btn-danger my-auto mx-2" onClick={deleteAction}>
                Delete
            </button>

            <button className="btn btn-warning text-white my-auto px-4" onClick={editAction}>Edit
            </button>
        </div>
    </li>
}