import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '../types';
import { useInstagramAuth } from '../hooks/useInstagramAuth';