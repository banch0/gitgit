FROM golang:streach

WORKDIR /go/src/app

RUN mkdir /build
RUN go get -u github.com/gobufffalo/packr/...

ENV GOOS linux
ENV GOARCH mips

VOLUME [ "/go/src/app" ]
VOLUME [ "/build" ]

CMD ["packr", "build", "-o", "/build/app"]