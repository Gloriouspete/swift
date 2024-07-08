
import { MdCancel, MdClose } from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useWindow from "./width.js"
export default function Imagebox({ image, cancel }) {
  console.log(image ,"i ages seen")
  const windowWidth = useWindow()
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 590 },
      items: 1
    },
    mobile: {
      breakpoint: { max: windowWidth, min: 0 },
      items: 1
    }
  };
  return (
    <>
      <main className="w-screen h-screen fixed inset-0 flex flex-col justify-center bg-black">
        <header className="fixed top-0 w-full h-12 flex justify-end px-3 py-2 z-50">
          <MdClose size={35} className="fill-white cursor-pointer z-[99999]" onClick={cancel} />
        </header>
        <div className="flex h-full w-full rounded-md  whitespace-nowrap py-3 items-center justify-center flex-col">
        <Carousel 
        swipeable={true}
        draggable={true}     
        ssr={true}
        responsive={responsive}
        showDots={true}
        className="h-full px-1 rounded-md w-full py-3 items-center justify-center flex">
          {image.map((item,index) => (
              <>
                <div key={index} className="w-full h-full mr-2 scroll-m-0">
                  <img src={item} width={1000} height={1000} className="w-full h-full object-contain border border-red-500" alt="Sent image" />
                </div>
              </>
            )
          )}
        </Carousel>
        </div>
        
      </main>
    </>
  );
}
