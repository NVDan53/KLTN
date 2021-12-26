import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminRoute from "../../../components/routes/AdminRoute";
import CategoryForm from "../../../components/forms/CategoryForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Avatar, Tooltip } from "antd";

const AdminCategoryIndex = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [slug, setSlug] = useState("");

  let router = useRouter();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      let { data } = await axios.get("/api/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await axios.post("/api/category", { name });
      // console.log(data);
      setName("");
      setLoading(false);
      toast("Category created ");
      // update state
      setCategories([data, ...categories]);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
      console.log(err.response);
    }
  };

  const handleDeleteClick = async (c) => {
    try {
      let { data } = await axios.delete(`/api/category/${c.slug}`);
      // console.log(c.slug);

      toast(`${data.name} deleted`);
      // update state
      let filtered = categories.filter((category) => category.slug !== c.slug);
      setCategories(filtered);
    } catch (err) {
      toast(err.response.data);
      console.log(err.response);
    }
  };

  const handleUpdateClick = (c) => {
    setUpdate(true);
    setName(c.name);
    setSlug(c.slug);
    // console.log(c.name, update);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.put(`/api/category/${slug}`, { name });
      // console.log("updated", data);
      toast(`${data.name} updated`);
      // update state, first remove updated category
      let filtered = categories.filter((category) => category.slug !== slug);
      // insert updated category
      setCategories([data, ...filtered]);
      // remove name and slug from state
      setName("");
      setSlug("");
      setUpdate(false);
    } catch (err) {
      toast(err.response.data);
      console.log(err.response);
    }
  };

  return (
    <AdminRoute>
      
       <div className="text-blue-900 text-sm rounded-md"style={{margin:"16px"}}>
        <ul className="flex">
          <li><a href="/instructor" className="underline font-semibold">Dashboard</a></li>
          <li><span className="mx-2">/</span></li>  
          <li>List categories</li>
        </ul>
      </div>
     <div>
     <CategoryForm
        handleSubmit={update ? handleUpdate : handleSubmit}
        name={name}
        setName={setName}
        loading={loading}
      />
   <div className="inline-block w-full shadow rounded-lg overflow-hidden mb-4 mt-4">
     <table className="w-full bg-white leading-normal">
       <thead>
         <tr>
           <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
             ID
           </th>
           <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
             Name
           </th>
           <th className="text-right px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
             Action
           </th>
           
         </tr>
       </thead>
       <tbody>
       {categories.map((c,index) => (
            
         <tr key={c._id} className="xyz hover:bg-sky-100">
            <td className="px-4 py-4 border-b border-gray-200  text-sm">
             <p className="text-gray-900 whitespace-no-wrap font-semibold">{index + 1}</p>
           </td>
           <td className="px-4 py-4 border-b border-gray-200  text-sm">
             <p className="text-gray-900 whitespace-no-wrap font-semibold">{c.title} {c.name}</p>
           </td>
          
           <td className="px-4 py-4 border-b border-gray-200  text-sm text-right">
           <Tooltip title="Update">
                        <EditOutlined
                        onClick={() => handleUpdateClick(c)}
                          className="h5 text-success pr-2 pl-2"
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteOutlined
                          onClick={() => handleDeleteClick(c)}
                          className="h5 text-danger pointer pr-2 pl-2"
                        />
                      </Tooltip>
           </td>
          
         
         </tr>
        
         ))}
       </tbody>
     </table>
     
  
 
</div>
</div>
    </AdminRoute>
  );
};

export default AdminCategoryIndex;