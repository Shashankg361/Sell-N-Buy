import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard(){
    return(
        <div>
            <div className="flex mt-2 p-1">
                <div className="bg-white w-2/4 border-1 rounded-md p-2">
                    <h1 className="font-semibold text-2xl">Booked</h1>
                    <h1 className="mt-5 font-bold text-4xl">0</h1>
                </div>
                <div className="ml-5 bg-white w-2/4 border-1 rounded-md p-2">
                    <h1 className="font-semibold text-2xl">Uploaded</h1>
                    <h1 className="mt-5 font-bold text-4xl">0</h1>
                </div>
            </div>
            <div>
                <div className="flex bg-white p-2 m-1 rounded-md items-center">
                    <h1 className="font-semibold text-xl">Mobile</h1>
                    <div className="bg-gray-400 p-3 ml-16 rounded-r-3xl ">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl"/>
                        <input placeholder="Search by title..." className="outline-0 placeholder:italic placeholder:text-gray-600 bg-gray-400 text-black w-80"></input>
                        <button type="button">Search</button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}