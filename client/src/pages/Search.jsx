import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    console.log(listings);

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });


  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
      ) {
        setSidebardata({
          searchTerm: searchTermFromUrl || '',
          type: typeFromUrl || 'all',
          parking: parkingFromUrl === 'true' ? true : false,
          furnished: furnishedFromUrl === 'true' ? true : false,
          offer: offerFromUrl === 'true' ? true : false,
          sort: sortFromUrl || 'created_at',
          order: orderFromUrl || 'desc',
        });
      }

      const fetchListings = async () => {
        setLoading(true);
        // setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length > 8) {
          setShowMore(true);
        } else {
        //   setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      };
  
      fetchListings();
  


  },[location.search])


  return (
    <div className=" font-Higuen flex flex-col md:flex-row">
      <div className=" p-7 border-b-2 md:border-r-2 md:min-h-screen md:max-w-sm">
        <form onSubmit={handleSubmit}  className=" flex flex-col gap-8">
          <div className=" flex items-center gap-2 ">
            <label className=" whitespace-nowrap font-semibold">
              {" "}
              Search Term :{" "}
            </label>
            <input
              type="text"
              name=""
              id="searchTerm"
              placeholder="Search"
              className=" border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className=" font-semibold">Type :</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="all"
                className=" w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="rent"
                className=" w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="sale"
                className=" w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="offer"
                className=" w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className=" font-semibold">Amenities :</label>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="parking"
                className=" w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className=" flex gap-2">
              <input
                type="checkbox"
                name=""
                id="furnished"
                className=" w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className=" flex items-center gap-2">
              <label className=" font-semibold"> Sort :</label>
              <select
                id="sort_order"
                className=" border rounded-lg p-3"
                onChange={handleChange}
                defaultValue={"created_at_desc"}
              >
                <option value="">Price high to low</option>
                <option value="">Price low to high</option>
                <option value="">latest</option>
                <option value="">Oldest</option>
              </select>
            </div>
          </div>
          <button className=" bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className=" text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results :{" "}
        </h1>
      </div>
    </div>
  );
};

export default Search;
