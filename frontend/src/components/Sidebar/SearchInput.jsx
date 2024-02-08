import React, { useState } from "react";
import { RiUserSearchLine } from "react-icons/ri";
import useConversation from "./../../zhustand/useConversation";
import useGetConversations from "./../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handelSubmit = (e) => {
    // console.log(search);
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 character long.");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    console.log(conversation);
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  };
  return (
    <form onSubmit={handelSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="...Search"
        className="input input-bordered rounded-full max-sm:w-24"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-700 text-white ">
        <RiUserSearchLine className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
