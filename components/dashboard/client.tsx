"use client";

import Button from "../elements/Button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/react";

import { clerkClient, useUser } from "@clerk/nextjs";
import { useState } from "react";

import toast from 'react-hot-toast';

export default function ClientSide() {

  const {user} = useUser();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [enteredPassword, setEnteredPassword] = useState("");

  function onSubmit() {
    fetch('/api/env', {
      method: 'POST',
      body: JSON.stringify({ givenPass: enteredPassword })
    }).then(res => res.json()).then(data => {
      if(data.success) {

        toast.success('Successfully logged in as admin');
        fetch('/api/metadata', {
          method: 'POST',
          body: JSON.stringify({ userId: user?.id, admin: true })
        }).then(res => res.json()).then(data => {
          console.log(data);
        })

      } else {

        toast.error('Wrong password');

      }
    })
  }

  return (
    <>
      <Button onPress={onOpen}>Sign in as admin</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  value={enteredPassword}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onSubmit();
                    onClose();
                  }}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
