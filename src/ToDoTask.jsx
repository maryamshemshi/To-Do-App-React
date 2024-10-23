import {useState} from "react";
import TodoItem from "./components/Todo/TodoItem.jsx";

export default function ToDoTask() {
    const [user, setUser] = useState('')
    const [users, setUsers] = useState([])
    const [selectIndex, setSelectIndex] = useState(-1)
    const [searchTerm, setSearchTerm] = useState("")
    const [category, setCategory] = useState('')
    const [temp, setTemp] = useState([])
    const [backMain, setBackMain] = useState(false)

    const handleSearch = (term) => {
        if (term === "") {
            setUsers(temp)
        } else {
            setTemp(users)
            setUsers(users.filter((u) => u.title.toLowerCase().includes(term.toLowerCase())));
        }
    }

    const handleCategory = (term) => {
        if (term === "") {
            setBackMain(false)
            setUsers(temp)
        } else {
            setTemp(users)
            setUsers(users.filter((u) => u.category.includes((term))));
            setBackMain(true)
        }
    }
    const addTaskHandler = () => {
        if (user === "")
            return;

        if (selectIndex >= 0) {
            let newUser = users;

            newUser[selectIndex] = {
                ...newUser[selectIndex],
                title: user,
                category: category
            };

            setUsers(newUser);
            setSelectIndex(-1);
        } else {
            setUsers([...users, {
                title: user,
                id: Math.random(),
                category: category,
                is_done: false
            }]);
        }
        setUser('');
    }

    const handelDone = (user) => {
        const id = users.findIndex(x => x.id === user.id);
        const newUsers = [...users];

        newUsers[id] = {...user, is_done: !user.is_done};

        setUsers(newUsers);
    }


    return <div className="border col-5 container m-4 mx-auto p-2">
        <div className="bg-info rounded">
            <h2 className="m-4 text-center text-white font-weight-bolder p-2">To Do App =&gt;</h2>
        </div>

        <div className="row mx-auto">
            <input placeholder="Search" type="search" value={searchTerm} className='form-control col-10 mr-3 ml-2'
                   onChange={(e) => {
                       setSearchTerm(e.target.value)
                   }}
                   onKeyPress={(e) => {
                       if (e.charCode === 13) {
                           handleSearch(searchTerm)
                       }
                   }
                   }/>
            <button className="btn btn-outline-info" onClick={() => handleSearch(searchTerm)}>Search</button>

        </div>
        <div className="row">
            <div className="mt-5 ml-4 text-info">
                <h5 className="border">
                    <a className="text-decoration-none" href="#" data-toggle="tooltip" title="Hooray!">
                        Now, It&#39;s Time To Create Your Tasks!
                    </a>
                </h5>
            </div>

            <input className="form-control col-md-7 ml-4" placeholder="Write your task's name BODY :D" type="text"
                   value={user} onChange={(e) => setUser(e.target.value)}
                   onKeyPress={(e) => {
                       if (e.charCode === 13) {
                           addTaskHandler()
                       }
                   }}/>

            <div className="dropdown ml-4">
                <select name="ChooseYourCategory" className="form-control btn-outline-info" value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>Category</option>
                    <option value="study">Study</option>
                    <option value="working">Working</option>
                    <option value="shopping">Shopping</option>
                    <option value="etc">etc</option>
                </select>
            </div>

            <button className="btn btn-outline-info ml-4" onClick={addTaskHandler}>
                Submit
            </button>

            <ol className="col justify-content-between my-auto">
                {users.map((user, index) => {
                    return <TodoItem key={user.id}
                                     user={user}
                                     handleCategory={handleCategory}
                                     deleteAction={() => setUsers(users.filter(x => x !== user))}
                                     doneAction={handelDone}
                                     editAction={() => {
                                         setUser(user.title);
                                         setCategory(user.category);
                                         setSelectIndex(index)
                                     }}/>
                })}
            </ol>
        </div>
        {
            backMain &&
            <button className="btn btn-info mb-2 d-flex mx-auto"
                    onClick={() => handleCategory('')}>
                Back To Main
            </button>
        }
    </div>
}