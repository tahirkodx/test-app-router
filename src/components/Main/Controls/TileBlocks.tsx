import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "@/styles/Component.module.scss";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

const TileBlocks = (props: any) => {
  const router = useRouter();
  return props.tileLinks.map((Child: any, index: number) => {
    return (
      <div
        className={`${styles.Tiles__Child} rounded overflow-hidden`}
        style={{
          background: `url(${props.TilesBG})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
        key={nanoid(9)}
      >
        <LazyLoadImage
          src={Child.product}
          alt={Child.productAlt}
          className={`${styles.Tiles__Product}`}
          width={Child.width}
          height={Child.height}
        />
        <div
          onClick={() => router.push(Child.url)}
          title={Child.title}
          className={`${styles.Tiles__Link} text-decoration-none d-flex align-items-end cursor-pointer user-select-none`}
        >
          <div className="text-light user-select-none">
            <h2 className="m-0 lh-1 fs-4 user-select-none">{Child.title}</h2>
            <div className="mt-2">
              <small>
                <p
                  className={`${styles.Tiles__Child__Paragraph} m-0 user-select-none`}
                >
                  {Child.paragraph}
                </p>
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default TileBlocks;
