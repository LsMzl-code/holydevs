"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import qs from "query-string";
import { useDebounceValue } from "@/app/hooks/useDebounceValue";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { Button } from "../shadcn/button";

const SearchInputMobile = () => {
   const searchParams = useSearchParams();
   const title = searchParams.get("title");

   const [value, setValue] = useState(title || "");

   const pathname = usePathname();
   const router = useRouter();

   const debounceValue = useDebounceValue<string>(value);

   useEffect(() => {
      const query = {
         title: debounceValue,
      };

      const url = qs.stringifyUrl(
         {
            url: window.location.href,
            query,
         },
         { skipNull: true, skipEmptyString: true }
      );

      router.push(url);
   }, [debounceValue, router]);

   const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setValue(event.target.value);
   };

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               className="rounded-full p-2"
               title="Rechercher"
            >
               <Search size={20} />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="p-0 rounded-full">
            <div className="flex">
               <input
                  className="border-r-0 rounded-r-0 border rounded-l-full border-gray-400 py-1.5 px-3 bg-background xl:w-[500px]"
                  value={value}
                  onChange={onChange}
               />
               <button
                  className="border border-l-0 border-gray-400 rounded-r-full pr-2 bg-foreground/50"
                  type="submit"
               >
                  <Search size={20} className="mx-2" />
               </button>
            </div>
         </PopoverContent>
      </Popover>
   );
};

export default SearchInputMobile;
