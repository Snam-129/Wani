import React from "react";

function AboutDetail() {
  return (
    <section className="w-full bg-white flex justify-center overflow-hidden py-16">
      <div
        className="w-full flex items-center justify-between opacity-100"
        style={{
          maxWidth: "1920px",
          paddingLeft: "195px",
          paddingRight: "195px",
        }}
      >
        <div
          className="relative overflow-hidden shrink-0 shadow-sm"
          style={{
            width: "650px" /* Thu nhỏ từ 751px xuống 650px */,
            height: "600px" /* Điều chỉnh lại chiều cao cho cân đối */,
            borderRadius: "20px",
          }}
        >
          <img
            src="abd-digi.png"
            alt="Digital Store"
            className="w-full h-full object-cover"
          />

          {/* Nút Play trung tâm */}
          <div className="">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <div className="ml-1 w-0 h-0 border-t-10 border-t-transparent border-l-15 border-l-black border-b-10 border-b-transparent"></div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col justify-center opacity-100"
          style={{
            width: "600px" /* Thu nhỏ nhẹ để tăng khoảng trắng giữa 2 khối */,
            gap: "40px",
          }}
        >
          <div className="flex flex-col gap-4 pl-16">
            <h2 className="text-[40px] font-bold text-[#272727] font-['Plus_Jakarta_Sans'] leading-tight">
              Best Digital Store Wani
            </h2>
            <p
              className="text-[#272727] opacity-90"
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: "400",
                fontSize: "18px",
                lineHeight: "180%",
                letterSpacing: "0.02em",
              }}
            >
              "Săn deal cực nhanh – Chất lượng cực chắc"
              <br />
              WANI (từ “Wani” trong tiếng Nhật nghĩa là cá mập) – biểu tượng cho
              sự nhanh nhẹn, mạnh mẽ và luôn dẫn đầu trong việc săn tìm những
              sản phẩm công nghệ tốt nhất với giá thấp nhất. WANI không chỉ là
              một website bán hàng...
            </p>

            <button
              className="flex items-center justify-center text-white transition-all hover:bg-black uppercase text-sm font-bold tracking-wider"
              style={{
                width: "171px",
                height: "54px",
                borderRadius: "90px",
                backgroundColor: "#272727",
              }}
            >
              GO TO SHOP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutDetail;
