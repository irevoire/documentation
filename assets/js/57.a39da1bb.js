(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{340:function(e,a,t){"use strict";t.r(a);var r=t(8),s=Object(r.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"about-storage"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#about-storage"}},[e._v("#")]),e._v(" About storage")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("TLDR")]),e._v(" "),t("ul",[t("li",[e._v("If the database does not shrink after deleting documents or indexes, it is expected behavior. You are not losing space, MeiliSearch is keeping this space for performance reasons.")]),e._v(" "),t("li",[e._v("You should have the same amount of RAM than the space taken on disk by MeiliSearch for optimal performances.")])])]),e._v(" "),t("p",[e._v("MeiliSearch is a database. It stores the indexed documents along with the data needed to perform lightning search.")]),e._v(" "),t("p",[e._v("Writing a database is hard, and we do not want to reinvent the wheel, so MeiliSearch uses a storage engine under the hood. Using a storage engine allows MeiliSearch to focus on improving search relevancy and search performance while abstracting the complicated task of creating, reading and updating documents on disk, and in memory.")]),e._v(" "),t("h2",{attrs:{id:"lmdb"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#lmdb"}},[e._v("#")]),e._v(" LMDB")]),e._v(" "),t("p",[e._v("The storage engine of MeiliSearch is "),t("a",{attrs:{href:"http://www.lmdb.tech/doc/",target:"_blank",rel:"noopener noreferrer"}},[e._v("LMDB"),t("OutboundLink")],1),e._v(". LMDB is a transactional key-value store written in C that was developed for OpenLDAP, and it has ACID properties."),t("br"),e._v(" "),t("br"),e._v("\nWe chose LMDB after we successfully (or not) tried MeiliSearch with "),t("a",{attrs:{href:"https://github.com/spacejam/sled",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sled"),t("OutboundLink")],1),e._v(" and "),t("a",{attrs:{href:"https://rocksdb.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("RocksDB"),t("OutboundLink")],1),e._v(" and decided to move on with LMDB because it is the best combination of performance and stability for Meilisearch.")]),e._v(" "),t("h3",{attrs:{id:"memory-mapping"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#memory-mapping"}},[e._v("#")]),e._v(" Memory mapping")]),e._v(" "),t("p",[e._v("LMDB stores its data in a "),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Memory-mapped_file",target:"_blank",rel:"noopener noreferrer"}},[e._v("memory-mapped file"),t("OutboundLink")],1),e._v(". All data fetched from LMDB is returned straight from the memory map, which means there is no memory allocation or memory copy during data fetches.")]),e._v(" "),t("p",[e._v("All documents stored on disk are automatically loaded in memory when MeiliSearch asks for them. This ensures LMDB will always make the best use of the RAM available to retrieve the documents.")]),e._v(" "),t("p",[e._v("For the best performance, it is recommended to provide the same amount of RAM as the size the database takes on disk, so all the data structures can fit in memory.")]),e._v(" "),t("h3",{attrs:{id:"understanding-lmdb"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#understanding-lmdb"}},[e._v("#")]),e._v(" Understanding LMDB")]),e._v(" "),t("p",[e._v("The choice of LMDB comes with certain pros and cons. In order to understand this choice, its upsides and downsides, we need to have an insight on how LMDB impact size and memory usage. This is well explained in "),t("a",{attrs:{href:"https://symas.com/understanding-lmdb-database-file-sizes-and-memory-utilization/",target:"_blank",rel:"noopener noreferrer"}},[e._v("a blogpost of LMDB"),t("OutboundLink")],1),e._v(" and we are trying to summarize it here.")]),e._v(" "),t("h4",{attrs:{id:"database-size"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#database-size"}},[e._v("#")]),e._v(" Database size")]),e._v(" "),t("p",[e._v("When freeing entries from the database (in our case, removing documents from MeiliSearch), one can observe that no space disk is released. The space previously used by the entry is marked as free for LMDB but not made available for the operating system.\nUnlike other storage engines, LMDB chooses this design for performance issues as there is no need for a compaction phase."),t("br"),e._v(" "),t("br"),e._v("\nAs a result, you may see that the disk occupied by LMDB and therefore by MeiliSearch keeps growing even if you are deleting indexes or documents. This is normal behavior, and you can note that the database will not grow again if you write some data after deleting indexes or documents.")]),e._v(" "),t("h4",{attrs:{id:"memory-usage"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#memory-usage"}},[e._v("#")]),e._v(" Memory usage")]),e._v(" "),t("p",[e._v("Since LMDB is memory mapped, it is the operating system who will manage the real memory allocated or not to MeiliSearch."),t("br"),e._v(" "),t("br"),e._v("\nThus, if you run MeiliSearch as a standalone program on a server, LMDB will use the maximum RAM it can use.\nIf you run MeiliSearch along with other programs, the OS will manage memory based on everyone's need making MeiliSearch quite flexible when used in development.")]),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),t("p",[t("strong",[e._v("Virtual memory != Real memory")]),t("br"),e._v("\nVirtual memory is the memory asked by a program to the OS. This is not the memory that the program will actually use.")]),e._v(" "),t("p",[e._v("In this case, MeiliSearch will always ask for a memory map of 200Gb. This refers to the virtual memory requested to the OS by MeiliSearch, but as you can see, the amount of real memory in RAM used will be smaller.")])]),e._v(" "),t("h2",{attrs:{id:"measured-disk-usage"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#measured-disk-usage"}},[e._v("#")]),e._v(" Measured disk usage")]),e._v(" "),t("p",[e._v("We did some measurements on the default "),t("a",{attrs:{href:"https://github.com/meilisearch/MeiliSearch/blob/master/datasets/movies/movies.json",target:"_blank",rel:"noopener noreferrer"}},[e._v("movies.json"),t("OutboundLink")],1),e._v(" dataset that you can find in the "),t("RouterLink",{attrs:{to:"/guides/introduction/quick_start_guide.html#add-documents"}},[e._v("getting started guide")]),e._v("."),t("br"),e._v("\nThis dataset is a JSON file of 8.6 Mb."),t("br"),e._v("\nWhen we index this file in MeiliSearch, the amount of disk space taken by LMDB is 122Mb.")],1),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Raw JSON")]),e._v(" "),t("th",[e._v("MeiliSearch database size on disk")]),e._v(" "),t("th",[e._v("Real memory size")]),e._v(" "),t("th",[e._v("Private memory size")]),e._v(" "),t("th",[e._v("Virtual memory size")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("8.6 Mb")]),e._v(" "),t("td",[e._v("122 Mb ( raw data "),t("strong",[e._v("* 14")]),e._v(" )")]),e._v(" "),t("td",[e._v("≃ 6.3 Mb")]),e._v(" "),t("td",[e._v("120 Mb (≃ size on disk)")]),e._v(" "),t("td",[e._v("204 Gb (memory map)")])])])])])}),[],!1,null,null,null);a.default=s.exports}}]);