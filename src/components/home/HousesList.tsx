"use client";
// React / Next
import { useEffect, useState } from "react";

// Hooks
import useLocation from "@/app/hooks/useLocations";

// Components
import HouseCard from "../house/HouseCardGrid";
import { HouseCardInline } from "../house/HouseCardInline";

// Types
import { HouseListTypes } from "@/types/home/House";

// Libraries
import { v4 as uuidv4 } from "uuid";
import { ICity, IState } from "country-state-city";

// UI Components
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../shadcn/select";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/shadcn/carousel";
import { Button } from "../shadcn/button";

// Icons
import {
   ArrowDownNarrowWide,
   ArrowUpNarrowWide,
   ChevronDown,
   LayoutGridIcon,
   RotateCcwIcon,
   StretchHorizontalIcon,
} from "lucide-react";

// Style
// import "../../../public/css/style.css";

const HousesList = ({ categories, types, houses, user }: HouseListTypes) => {
   // Filters
   const [categoryFilter, setCategoryFilter] = useState<string>("");
   const [typeFilter, setTypeFilter] = useState<string>("");
   const [display, setDisplay] = useState<string>("grid");

   const [sortedHouses, setSortedHouses] = useState("");

   // Categories & types filter
   const handleCategoryFilter = (selectedCategory: string) => {
      setCategoryFilter(selectedCategory.toLowerCase());
   };

   const handleTypeFilter = (selectedType: string) => {
      setTypeFilter(selectedType.toLowerCase());
   };
   const resetFilter = () => {
      setCategoryFilter("");
      setTypeFilter("");
   };

   // Location filter
   const [country, setCountry] = useState("");
   const [state, setState] = useState("");
   const [city, setCity] = useState("");
   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);
   const { getAllCountries, getCountryStates, getStateCities } = useLocation();
   const countries = getAllCountries();

   useEffect(() => {
      const countryStates = getCountryStates(country);
      if (countryStates) {
         setStates(countryStates);
         setState("");
         setCity("");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [country]);
   useEffect(() => {
      const stateCities = getStateCities(country, state);
      if (stateCities) {
         setCities(stateCities);
         setCity("");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [country, state]);
   const handleClear = () => {
      setCountry("");
      setState("");
      setCity("");
   };

   // Filtrage des résultats selon la catégorie, type et localisation selectionné
   let filteredHouses = houses.filter(
      (house) =>
         house.categories[0].category.name
            .toLowerCase()
            .includes(categoryFilter) &&
         house.types[0].type.name.toLowerCase().includes(typeFilter) &&
         house.country.includes(country) &&
         house.state.includes(state) &&
         house.city.includes(city)
   );

   if (sortedHouses === "asc") {
      filteredHouses = houses
         .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
         .filter(
            (house) =>
               house.categories[0].category.name
                  .toLowerCase()
                  .includes(categoryFilter) &&
               house.types[0].type.name.toLowerCase().includes(typeFilter) &&
               house.country.includes(country) &&
               house.state.includes(state) &&
               house.city.includes(city)
         );
   } else if (sortedHouses === "desc") {
      filteredHouses = houses
         .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
         .filter(
            (house) =>
               house.categories[0].category.name
                  .toLowerCase()
                  .includes(categoryFilter) &&
               house.types[0].type.name.toLowerCase().includes(typeFilter) &&
               house.country.includes(country) &&
               house.state.includes(state) &&
               house.city.includes(city)
         );
   }

   return (
      <section className="mt-10 mx-auto">
         <div className="flex items-center gap-2 md:gap-5 mt-3 md:mt-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
               Toutes les annonces
            </h2>
         </div>
         <div className="bg-foreground/5 rounded-lg p-2 shadow">
            {/* Categories Filter */}
            <div className="">
               <Carousel
                  opts={{
                     align: "start",
                     loop: true,
                     dragFree: true,
                  }}
                  className="w-full relative"
               >
                  <CarouselContent className=" -ml-0">
                     <Button
                        size="sm"
                        className="shadow hover:bg-foreground/20 bg-foreground/10 text-foreground"
                        onClick={() => resetFilter()}
                     >
                        Tout
                     </Button>

                     {types.map((type) => (
                        <CarouselItem key={uuidv4()} className="basis-1/8">
                           <Button
                              size="sm"
                              className="shadow hover:bg-purple-500 capitalize hover:no-underline"
                              key={uuidv4()}
                              variant={
                                 typeFilter === type.name ? "selected" : "type"
                              }
                              onClick={() => {
                                 typeFilter === type.name
                                    ? setTypeFilter("")
                                    : handleTypeFilter(type.name);
                              }}
                           >
                              {type.name}
                           </Button>
                        </CarouselItem>
                     ))}
                     {categories.map((category) => (
                        <CarouselItem key={uuidv4()} className="basis-1/8">
                           <Button
                              size="sm"
                              className="shadow hover:bg-cyan-400 capitalize hover:no-underline"
                              key={uuidv4()}
                              variant={
                                 categoryFilter === category.name
                                    ? "selected"
                                    : "category"
                              }
                              onClick={() => {
                                 categoryFilter === category.name
                                    ? setCategoryFilter("")
                                    : handleCategoryFilter(category.name);
                              }}
                           >
                              {category.name}
                           </Button>
                        </CarouselItem>
                     ))}
                  </CarouselContent>
               </Carousel>
            </div>
            <div className="flex items-center justify-between mt-3">
               {/* Localisation filter */}
               <div className="flex items-center gap-1 bg-foreground/10 md:p-0.5 rounded-lg">
                  {/* Pays */}
                  <div>
                     <Select
                        value={country}
                        onValueChange={(value) => setCountry(value)}
                     >
                        <SelectTrigger className="hover:bg-foreground/10 bg-transparent border-none">
                           <SelectValue placeholder="Pays" />
                        </SelectTrigger>
                        <SelectContent>
                           {countries.map((country) => (
                              <SelectItem
                                 value={country.isoCode}
                                 key={uuidv4()}
                              >
                                 {country.name}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
                  {/* Régions */}
                  <div className="w-full">
                     <Select
                        value={state}
                        onValueChange={(value) => setState(value)}
                     >
                        <SelectTrigger
                           className="hover:bg-foreground/10 bg-transparent border-none p-0"
                           disabled={country === ""}
                        >
                           <SelectValue placeholder="Région" />
                        </SelectTrigger>
                        <SelectContent>
                           {!!states.length &&
                              states.map((state) => (
                                 <SelectItem
                                    value={state.isoCode}
                                    key={uuidv4()}
                                 >
                                    {state.name}
                                 </SelectItem>
                              ))}
                        </SelectContent>
                     </Select>
                  </div>
                  {/* Villes */}
                  <div>
                     <Select
                        value={city}
                        onValueChange={(value) => setCity(value)}
                     >
                        <SelectTrigger
                           className="hover:bg-foreground/10 bg-transparent border-none"
                           disabled={country === "" || state === ""}
                        >
                           <SelectValue placeholder="Ville" />
                        </SelectTrigger>
                        <SelectContent>
                           {!!cities.length &&
                              cities.map((city) => (
                                 <SelectItem value={city.name} key={uuidv4()}>
                                    {city.name}
                                 </SelectItem>
                              ))}
                        </SelectContent>
                     </Select>
                  </div>
                  <div
                     className="text-red-500 cursor-pointer"
                     onClick={() => handleClear()}
                  >
                     <RotateCcwIcon className="h-5 w-5 ml-1 mr-2 hover:animate-spin-fast" />
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  {/* Sort Menu */}
                  <div className="hidden md:block">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button className="flex items-center gap-1 cursor-pointer bg-foreground/10 hover:bg-foreground/20">
                              <p className="text-md text-foreground">Trier</p>
                              <ChevronDown className="h-5 w-5 text-foreground" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-1" align="end">
                           <DropdownMenuLabel>Prix</DropdownMenuLabel>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem>
                              <div
                                 className="flex items-center gap-2 group cursor-pointer"
                                 onClick={() => setSortedHouses("asc")}
                              >
                                 <ArrowUpNarrowWide className="h-4 w-4" />
                                 <p className="group-hover:font-medium">
                                    Croissant
                                 </p>
                              </div>
                           </DropdownMenuItem>
                           <DropdownMenuItem>
                              <div
                                 className="flex items-center gap-2 group"
                                 onClick={() => setSortedHouses("desc")}
                              >
                                 <ArrowDownNarrowWide className="h-4 w-4" />
                                 <p className="cursor-pointer group-hover:font-medium">
                                    Décroissant
                                 </p>
                              </div>
                           </DropdownMenuItem>
                           <DropdownMenuItem>
                              <div className="flex items-center gap-2 group">
                                 <RotateCcwIcon className="h-4 w-4" />
                                 <p className="cursor-pointer group-hover:font-medium">
                                    Réinitialiser
                                 </p>
                              </div>
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
                  {/* Vue grille & liste */}
                  {display === "grid" ? (
                     <Button
                        className="bg-foreground/10 px-2.5 hover:bg-foreground/20"
                        onClick={() => setDisplay("inline")}
                        title="Vue liste"
                     >
                        <StretchHorizontalIcon className="h-5 w-5 text-foreground" />
                     </Button>
                  ) : (
                     <Button
                        className="bg-foreground/10 px-2.5 hover:bg-foreground/20"
                        onClick={() => setDisplay("grid")}
                        title="Vue grille"
                     >
                        <LayoutGridIcon className="h-5 w-5 text-foreground" />
                     </Button>
                  )}
               </div>
            </div>
         </div>

         {filteredHouses.length === 0 ? (
            <p className="w-[490px]">
               Aucune annonce ne correspond à votre recherche...
            </p>
         ) : display === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-5 mt-4">
               {filteredHouses.map((house) => (
                  <HouseCard key={uuidv4()} house={house} user={user} />
               ))}
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mt-4">
               {filteredHouses.map((house) => (
                  <HouseCardInline key={uuidv4()} house={house} user={user} />
               ))}
            </div>
         )}
      </section>
   );
};

export default HousesList;
