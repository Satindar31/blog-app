-- CreateTable
CREATE TABLE "Blog" (
    "title" STRING NOT NULL,
    "shortContent" STRING NOT NULL,
    "content" STRING NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPublic" BOOL NOT NULL,
    "bid" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "email" STRING NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("bid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_title_key" ON "Blog"("title");